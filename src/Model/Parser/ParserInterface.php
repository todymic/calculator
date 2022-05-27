<?php

namespace App\Model\Parser;

use App\Model\Expression;
use App\Model\Operator\Operator;
use App\Model\Stack;

interface ParserInterface
{
    public function parse(Operator $operator, Stack $output, Stack $stack);
}
