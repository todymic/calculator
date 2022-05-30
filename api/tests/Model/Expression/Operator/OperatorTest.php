<?php

namespace App\Tests\Model\Operator;

use App\Model\Expression\Number;
use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Expression\Operator\Operator;
use App\Model\Expression\Operator\Subtraction;
use PHPUnit\Framework\TestCase;
use App\Tests\Mock\Stack;

class OperatorTest extends TestCase
{
    /**
     * @return array<string, array<Multiplication|Division|Subtraction|Addition|string[]|array{operate: string, precedence: string, render: string}>>
     */
    public function operatorProvider(): array
    {
        return [
            'Addition' => [
                new Addition(),
                ['1', '2'],
                [
                    'operate' => '3',
                    'precedence' => '4',
                    'render' => '+',
                ],
            ],
            'Subtraction' => [
                new Subtraction(),
                ['1', '2'],
                [
                    'operate' => '1',
                    'precedence' => '4',
                    'render' => '-',
                ],
            ],
            'Division' => [
                new Division(),
                ['2', '2'],
                [
                    'operate' => '1',
                    'precedence' => '5',
                    'render' => '/',
                ],
            ],
            'Multiplication' => [
                new Multiplication(),
                ['2', '2'],
                [
                    'operate' => '4',
                    'precedence' => '5',
                    'render' => '*',
                ],
            ],
        ];
    }

    /**
     * @dataProvider operatorProvider
     * @param string[] $returnOperateCallsNumbers
     * @param array<string, string> $expected
     */
    public function testAllOperators(
        Operator $operator,
        array $returnOperateCallsNumbers,
        array $expected
    ): void {

        //create 2 numbers
        $number = $this->createMock(Number::class);
        $number->expects($this->any())
            ->method('operate')
            ->willReturnOnConsecutiveCalls($returnOperateCallsNumbers[0], $returnOperateCallsNumbers[1]);

        // create stack
        $stack = $this->createMock(Stack::class);
        $stack->expects($this->any())
            ->method('pop')
            ->willReturnOnConsecutiveCalls($number, $number);


        $this->assertEquals($expected['operate'], $operator->operate($stack));
        $this->assertEquals($expected['precedence'], $operator->getPrecedence());
        $this->assertEquals($expected['render'], $operator->render());
        $this->assertTrue($operator->isOperator());
        $this->assertTrue($operator->isLeftAssoc());
    }

}
