<?php

namespace App\Model\Operator;

use App\Model\Stack;

class Subtraction extends Operator
{
    final public const OPERATOR = '-';

    protected int $precedence = 4;

    public function operate(Stack $stack): int|float
    {
        $left  = $stack->pop()->operate($stack);
        $right = $stack->pop()->operate($stack);

        return $right - $left;
    }

    public function render(): string
    {
        return self::OPERATOR;
    }
}
