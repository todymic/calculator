<?php

namespace App\Model\Parser;

use App\Model\Expression;
use App\Model\Operator\Operator;
use App\Model\Stack;

class OperatorParser implements ParserInterface
{
    public function parse(Operator $operator, Stack $output, Stack $stack): void
    {
        $end = $stack->poke();

        if (!$end) {
            $stack->push($operator);
        } elseif ($end->isOperator()) {
            do {
                /** @var Operator $end */
                if ($operator->isLeftAssoc() && $operator->getPrecedence() <= $end->getPrecedence()) {
                    $output->push($stack->pop());
                } else {
                    break;
                }
            } while (($end = $stack->poke()) && $end->isOperator());

            $stack->push($operator);
        } else {
            $stack->push($operator);
        }
    }
}
