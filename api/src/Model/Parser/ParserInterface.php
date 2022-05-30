<?php

namespace App\Model\Parser;

use App\Model\Expression\Operator\Operator;
use App\Model\Stack;

interface ParserInterface
{
    public function parse(Operator $operator, Stack $output, Stack $stack);
}
