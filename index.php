<?php

use App\Calculator;
use App\Model\Parser\OperatorParser;
use Symfony\Component\ErrorHandler\Debug;
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__.'/vendor/autoload.php';

$request = Request::createFromGlobals();

Debug::enable();


$calculator = new Calculator($request, new OperatorParser());

$response = $calculator->run();

$response->send();

