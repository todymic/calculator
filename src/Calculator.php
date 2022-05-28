<?php

namespace App;

use App\Model\ExpressionFactory;
use App\Model\Operator\Operator;
use App\Model\Parser\ParserInterface;
use App\Model\Stack;
use RuntimeException;
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
        $stack = $this->getFormatedOutput($input);
        $result = $this->readRPNOutput($stack);
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
     * Read the RPN output format
     * @throws \Exception
     */
    protected function readRPNOutput(Stack $stack): string
    {
        while (($operator = $stack->pop()) && $operator->isOperator()) {
            $value = $operator->operate($stack);
            if (!is_null($value)) {
                $stack->push(ExpressionFactory::create($value));
            }
        }

        return $operator !== null ? $operator->render() : $this->render($stack);
    }


    protected function render(Stack $stack): string
    {
        $output = '';
        while (($el = $stack->pop())) {
            $output .= $el->render();
        }
        if ($output !== '' && $output !== '0') {
            return $output;
        }
        throw new RuntimeException('Could not render output');
    }

    /**
     * @return string[]
     */
    protected function tokenize(string $string): array
    {
        $parts = preg_split('((-?\d*\.?\d+|\+|\-|\(|\)|\*|\/)|\s+)', $string, null, \PREG_SPLIT_NO_EMPTY | \PREG_SPLIT_DELIM_CAPTURE);
        return array_map('trim', $parts);
    }
}
