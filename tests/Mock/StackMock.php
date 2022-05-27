<?php

namespace Tests\Mock;

use App\Model\Expression;
use App\Model\Stack;

class StackMock extends Stack
{
    /**
     * @return Expression[]
     */
    public function getData(): array
    {
        return $this->data;
    }
}
