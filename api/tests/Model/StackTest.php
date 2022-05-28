<?php

namespace App\Tests\Model;

use App\Model\Expression\Number;
use PHPUnit\Framework\TestCase;
use App\Tests\Mock\Stack;

class StackTest extends TestCase
{
    private Stack $stack;

    protected function setUp(): void
    {
        $this->stack = new Stack();
    }

    public function testPush(): void
    {
        $data = $this->stack->getData();
        $this->assertEmpty($data);

        $this->stack->push(new Number(1));
        $this->assertCount(1, $this->stack->getData());

        $this->stack->push(new Number(2));
        $this->assertCount(2, $this->stack->getData());

        $this->stack->push(new Number(1));
        $this->assertCount(3, $this->stack->getData());
    }

    /**
     * @depends testPush
     */
    public function testPoke(): void
    {
        $this->stack->push(new Number(1));
        $lastElement = $this->stack->poke();
        $this->assertCount(1, $this->stack->getData());
        $this->assertEquals(1, $lastElement->render());


        $this->stack->push(new Number(24));
        $lastElement = $this->stack->poke();
        $this->assertCount(2, $this->stack->getData());
        $this->assertEquals(24, $lastElement->render());
    }

    /**
     * @depends testPush
     */
    public function testPop(): void
    {
        $this->assertEmpty($this->stack->getData());

        $this->stack->push(new Number(1));
        $this->assertCount(1, $this->stack->getData());

        $this->stack->push(new Number(1));
        $this->assertCount(2, $this->stack->getData());

        $this->stack->pop();
        $this->assertCount(1, $this->stack->getData());

        $this->stack->pop();
        $this->assertEmpty($this->stack->getData());
    }
}
