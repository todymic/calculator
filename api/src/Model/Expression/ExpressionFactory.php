<?php

namespace App\Model\Expression;

use App\Exception\InvalidExpressionValueException;
use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Expression\Operator\Subtraction;
use Exception;

class ExpressionFactory
{
    /**
     * @throws Exception
     */
    public static function create(mixed $value): Expression
    {
        if (is_numeric($value)) {
            return new Number($value);
        } elseif ($value == '+') {
            return new Addition();
        } elseif ($value == '-') {
            return new Subtraction();
        } elseif ($value == '*') {
            return new Multiplication();
        } elseif ($value == '/') {
            return new Division();
        }

        throw new InvalidExpressionValueException('Incorrect Value ' . $value);
    }
}
