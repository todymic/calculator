<?php

namespace App\Model\Parser;

use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Expression\Operator\Subtraction;
use App\Tests\Mock\Stack;
use PHPUnit\Framework\TestCase;

class OperatorParserTest extends TestCase
{

	/**
	 *
	 * Put some Operators in the Stack at first ==> [+ - / *]
	 *
	 * The algorithm order the operators by checking their precedence: * and / are higher than - and +
	 * So, the final output has to be [ * / - + ]
	 *
	 * @return void
	 */
	public function testFunctionalParse()
	{
		$parser = new OperatorParser();

		$operator = new Addition();

		$stack  = new Stack();
		$output = clone $stack;
		$stack->push(new Addition());
		$stack->push(new Subtraction());
		$stack->push(new Division());
		$stack->push(new Multiplication());

		$parser->parse($operator, $output, $stack);

		$data = $output->getData();

		$this->assertInstanceOf(Multiplication::class, $data[0]);
		$this->assertInstanceOf(Division::class, $data[1]);
		$this->assertInstanceOf(Subtraction::class, $data[2]);
		$this->assertInstanceOf(Addition::class, $data[3]);
	}
}
