<?php

namespace App;

use App\Model\ExpressionFactory;
use App\Model\Operator\Operator;
use App\Model\Parser\ParserInterface;
use App\Model\Stack;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class Calculator
{
    public function __construct(private readonly Request $request, private readonly ParserInterface $parser)
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
	    $tokens = $this->tokenize($string);
	    $output = new Stack();
	    $operators = new Stack();

	    foreach ($tokens as $token) {
		    $expression = ExpressionFactory::create($token);

		    if ($expression->isOperator()) {
				/** @var Operator $expression */
			    $this->parser->parse($expression, $output, $operators);
		    } else {
			    $output->push($expression);
		    }
	    }

	    while (($op = $operators->pop())) {
		    $output->push($op);
	    }

        return $output;
    }

    /**
     * @return string[]
     */
    protected function tokenize(string $string): array
    {
        $parts = preg_split('((-?\d*\.?\d+|\+|\-|\(|\)|\*|\/)|\s+)', (string) $string, null, \PREG_SPLIT_NO_EMPTY | \PREG_SPLIT_DELIM_CAPTURE);
        return array_map('trim', $parts);
    }
}
