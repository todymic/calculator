<?php

namespace App\Tests\Mock;

use App\Manager\Calculator as BaseCalculator;
use App\Model\Stack;

class Calculator extends BaseCalculator
{
    public function getBaseFormatedOutput(string $string): Stack
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

	public function readRPNOutput(Stack $stack): string
	{
		return parent::readRPNOutput($stack);

	}
}
