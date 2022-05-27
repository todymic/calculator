<?php

namespace App\Model\Operator;

use App\Model\Stack;

class Addition extends Operator
{
	final public const OPERATOR = '+';

    protected int $precedence = 4;

    public function operate(Stack $stack): float|int|array
    {
        $left = $stack->pop()->operate($stack);
        $right = $stack->pop()->operate($stack);
        return $left + $right;
    }

    public function render(): string
    {
        return self::OPERATOR;
    }
}
