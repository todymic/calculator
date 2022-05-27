<?php

namespace Model;

use App\Model\ExpressionFactory;
use App\Model\Number;
use App\Model\Operator\Addition;
use App\Model\Operator\Division;
use App\Model\Operator\Multiplication;
use App\Model\Operator\Subtraction;
use Exception;
use PHPUnit\Framework\TestCase;

class ExpressionFactoryTest extends TestCase
{
    private ExpressionFactory $expressionFactory;

    /**
     * @return array<string, array<Number|Multiplication|Division|Subtraction|Addition|string>>
     */
    public function valueProvider(): array
    {
        return [
            'get addition object' => ['+', new Addition()],
            'get Subtraction object' => ['-', new Subtraction()],
            'get Division object' => ['/', new Division()],
            'get Multiplication object' => ['*', new Multiplication()],
            'get Number object' => ['1', new Number('1')],
        ];
    }

    protected function setUp(): void
    {
        $this->expressionFactory = new ExpressionFactory();
    }

    /**
     * @dataProvider valueProvider
     * @throws Exception
     */
    public function testCreate(string $value, Addition|Subtraction|Division|Multiplication|Number $expected): void
    {
        $this->assertEquals($expected, $this->expressionFactory::create($value));
    }

    public function testFailedCreatedExpression(): void
    {
        $this->expectException(Exception::class);
        $this->expectErrorMessage('Incorrect Value test');
        $this->expressionFactory::create('test');
    }
}
