<?php

namespace App;

use App\Model\Stack;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class Calculator
{
    public function __construct(private readonly Request $request)
    {
    }

    public function run(): JsonResponse
    {
        $input = $this->request->request->get('input');
        $result = $this->getFormatedOutput($input);
        return new JsonResponse($result);
    }

    /**
     * Return the output stack with RPN format
     * 1 + 2 ==> 1 2 +
     */
    protected function getFormatedOutput(string $string): Stack
    {
        $this->tokenize($string);

        return new Stack();
    }

    /**
     * @return string[]
     */
    protected function tokenize(string $string): array
    {
        $parts = preg_split('((\d*\.?\d+|\+|\-|\*|\/)|\s+)', (string) $string, null, \PREG_SPLIT_NO_EMPTY | \PREG_SPLIT_DELIM_CAPTURE);
        return array_map('trim', $parts);
    }
}
