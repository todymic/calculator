<?php

namespace App\Model\Expression;

use App\Model\Stack;

abstract class Expression
{
	abstract public function operate(Stack $stack);

	abstract public function render(): string;

	public function isOperator(): bool
	{
		return false;
	}

}
