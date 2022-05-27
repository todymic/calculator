<?php

namespace App\Model;

class Stack
{
    /**
     * @var Expression[] $data
     */
    protected array $data = [];

    public function push(Expression $element): void
    {
        $this->data[] = $element;
    }

    public function poke(): Expression|bool
    {
        return end($this->data);
    }

    public function pop(): ?Expression
    {
        return array_pop($this->data);
    }
}
