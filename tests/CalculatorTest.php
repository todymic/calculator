<?php

namespace Tests;

use App\Calculator;
use App\Model\Number;
use App\Model\Operator\Addition;
use App\Model\Parser\OperatorParser;
use App\Model\Stack;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Tests\Mock\CalculatorMockTest;

class CalculatorTest extends TestCase
{
    /**
     * @var Calculator|mixed
     */
    public $calculator;
    /**
     * @var CalculatorMockTest|mixed
     */
    public $calculatorMock;

    /**
     * @return array<int, array<string[]|string>>
     */
    public function inputProvider(): array
    {
        return [
            ['1+2', ['1', '+', '2']],
            ['1 + 2 * 3', ['1', '+', '2', '*', '3']],
            ['-1 + 2 * 3', ['-', '1', '+', '2', '*', '3']],
            ['1-2/0.4', ['1', '-', '2', '/', '0.4']],
        ];
    }

    protected function setUp(): void
    {
        $request = new Request();
        $request->request->set('input', '1+2');

        $parser               = new OperatorParser();
        $this->calculator     = new Calculator($request, $parser);
        $this->calculatorMock = new CalculatorMockTest($request, $parser);
    }

	/**
	 * @depends testFormatedOutput
	 * @return void
	 */
    public function testRun(): void
    {
        $this->assertInstanceOf(JsonResponse::class, $this->calculator->run());
    }

	/**
	 * @depends testTokenize
	 * @return void
	 */
    public function testFormatedOutput(): void
    {
        $output = $this->calculatorMock->getFormatedOutput('1+2');
        $this->assertInstanceOf(Stack::class, $output);
    }

    /**
     * @dataProvider inputProvider
     *
     * @param string[] $expected
     */
    public function testTokenize(string $input, array $expected): void
    {
        $this->assertEquals($expected, $this->calculatorMock->tokenize($input));
    }
}
