<?php

namespace Tests\Model;

use App\Model\Number;
use PHPUnit\Framework\TestCase;
use Tests\Mock\Stack;

class NumberTest extends TestCase
{

	/**
	 * @var Number|mixed
	 */
	public $number;
	protected function setUp(): void
	{
		$this->number = new Number('2');
	}

	public function testOperate(): void
	{
		$stack = new Stack();

		$this->assertEquals(2, $this->number->operate($stack));

	}

	public function testIsOperator(): void
	{
		$this->assertFalse($this->number->isOperator());
	}
}
