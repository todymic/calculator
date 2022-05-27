<?php

namespace App\Model;

class Number extends Expression
{
	public function __construct(private readonly string $value)
	{
	}

	public function operate(Stack $stack): string
	{
		return $this->value;
	}

	public function render(): string
	{
		return $this->value;
	}
}
