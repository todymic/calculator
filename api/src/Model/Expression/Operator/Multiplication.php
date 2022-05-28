<?php

namespace App\Model\Expression\Operator;

use App\Model\Stack;

class Multiplication extends Operator
{
    final public const OPERATOR = '*';

    protected int $precedence = 5;

    public function operate(Stack $stack): int|float
    {
        return $stack->pop()->operate($stack) * $stack->pop()->operate($stack);
    }

    public function render(): string
    {
        return self::OPERATOR;
    }
}
