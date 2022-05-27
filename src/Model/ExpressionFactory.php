<?php

namespace App\Model;

use App\Model\Operator\Addition;
use App\Model\Operator\Division;
use App\Model\Operator\Multiplication;
use App\Model\Operator\Subtraction;
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

        throw new Exception('Incorrect Value ' . $value);
    }
}
