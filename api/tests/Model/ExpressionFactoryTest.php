<?php

namespace App\Tests\Model;

use App\Exception\InvalidExpressionValueException;
use App\Model\Expression\ExpressionFactory;
use App\Model\Expression\Number;
use App\Model\Expression\Operator\Addition;
use App\Model\Expression\Operator\Division;
use App\Model\Expression\Operator\Multiplication;
use App\Model\Expression\Operator\Subtraction;
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
        $this->expectException(InvalidExpressionValueException::class);
        $this->expectErrorMessage('Incorrect Value test');
        $this->expressionFactory::create('test');
    }
}
