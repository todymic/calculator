<?php

namespace App\Tests\Mock;

use App\Model\Expression\Expression;
use App\Model\Stack as BaseStack;

class Stack extends BaseStack
{
    /**
     * @return Expression[]
     */
    public function getData(): array
    {
        return $this->data;
    }
}
