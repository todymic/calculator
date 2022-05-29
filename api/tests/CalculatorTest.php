<?php

namespace App\Tests;

use App\Model\Expression\Number;
use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Parser\OperatorParser;
use App\Model\Stack;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Tests\Mock\Calculator;

class CalculatorTest extends TestCase
{
    /**
     */
    public Calculator $calculator;

    /**
     * @return array<int, array<string[]|string>>
     */
    public function inputProvider(): array
    {
        return [
            ['1+2', ['1', '+', '2']],
            ['1 + 2 * 3', ['1', '+', '2', '*', '3']],
            ['-1 + 2 * 3', ['-1', '+', '2', '*', '3']],
            ['1 - 2 / 0.4', ['1', '-', '2', '/', '0.4']],
        ];
    }

    protected function setUp(): void
    {
        $request = new Request();
        $request->request->set('input', '1+2');

        $parser           = new OperatorParser();
        $this->calculator = new Calculator($parser);
    }

    /**
     * @depends testFormatedOutput
     */
    public function testExecute(): void
    {
        $this->assertEquals('3', $this->calculator->execute('1+2'));
    }

    /**
     * @depends testTokenize
     */
    public function testFormatedOutput(): void
    {
		/** @var Stack $output */
        $output = $this->calculator->getBaseFormatedOutput('1+2');
        $this->assertInstanceOf(Stack::class, $output);

		$this->assertEquals('+', $output->poke()->render());

	    $output->pop();
		$this->assertEquals('2', $output->poke()->render());

	    $output->pop();
		$this->assertEquals('1', $output->poke()->render());

    }

    /**
     * @dataProvider inputProvider
     *
     * @param string[] $expected
     */
    public function testTokenize(string $input, array $expected): void
    {
        $this->assertEquals($expected, $this->calculator->tokenize($input));
    }

	/*
	 * input Stack : [3 4 2 * 3 / +]
	 *
	 * result after RPN read: 7
	 */
	public function testReadRPNOutput()
	{
		$stack = new Stack();
		$stack->push(new Number('3'));
		$stack->push(new Number('4'));
		$stack->push(new Number('2'));
		$stack->push(new Multiplication());
		$stack->push(new Number('2'));
		$stack->push(new Division());
		$stack->push(new Addition());

		$this->assertEquals('7', $this->calculator->readRPNOutput($stack));
	}
}
