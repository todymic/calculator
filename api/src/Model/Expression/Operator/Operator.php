<?php

namespace App\Model\Expression\Operator;

use App\Model\Expression\Expression;

abstract class Operator extends Expression
{
    protected int $precedence = 0;

    protected bool $leftAssoc = true;

    public function getPrecedence(): int
    {
        return $this->precedence;
    }

    public function isLeftAssoc(): bool
    {
        return $this->leftAssoc;
    }

    public function isOperator(): bool
    {
        return true;
    }
}
