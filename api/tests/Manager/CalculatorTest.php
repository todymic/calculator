<?php

namespace App\Tests\Manager;

use App\Model\Expression\Number;
use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Parser\OperatorParser;
use App\Model\Stack;
use App\Tests\Mock\ExpressionFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use App\Tests\Mock\Calculator;

class CalculatorTest extends TestCase
{

    public Calculator $calculator;

	private MockObject|OperatorParser $parser;
	private MockObject|ExpressionFactory $expressionFactory;

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

		$this->parser = $this->createMock(OperatorParser::class);

        $this->calculator = new Calculator($this->parser);
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
	    $output = new Stack();
	    $operators = new Stack();

		$argParse = clone $output;
		$argParse->push(new Number('1'));

		$this->parser->expects($this->any())
			->method('parse')
			->with(new Addition(), $argParse, $operators);

		$output = $this->calculator->getBaseFormatedOutput('1+2');

        $this->assertInstanceOf(Stack::class, $output);



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
