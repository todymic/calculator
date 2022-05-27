<?php

namespace Tests\Mock;

use App\Calculator;
use App\Model\Stack;

class CalculatorMockTest extends Calculator
{
	public function getFormatedOutput($string): Stack
	{
		return parent::getFormatedOutput($string);
	}

	public function tokenize($string): array
	{
		return parent::tokenize($string);
	}
}
