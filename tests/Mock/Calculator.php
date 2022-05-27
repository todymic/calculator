<?php

namespace Tests\Mock;

use App\Calculator as BaseCalculator;
use App\Model\Stack;

class Calculator extends BaseCalculator
{
    public function getFormatedOutput(string $string): Stack
    {
        return parent::getFormatedOutput($string);
    }

    /**
     * @return string[]
     */
    public function tokenize(string $string): array
    {
        return parent::tokenize($string);
    }
}
