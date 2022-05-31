<?php

namespace App\Model\Expression\Operator;

use App\Model\Stack;
use DivisionByZeroError;

class Division extends Operator
{
    final public const OPERATOR = '/';

    protected int $precedence = 5;

    public function operate(Stack $stack): int|float
    {
        $left = $stack->pop()->operate($stack);
        $right = $stack->pop()->operate($stack);

        if ($left == '0') {
            $errorMessage = $right == '0' ? 'Error' : 'Infinity';

            throw new DivisionByZeroError($errorMessage);
        }

        return $right / $left;
    }

    public function render(): string
    {
        return self::OPERATOR;
    }
}
