<?php

use App\Calculator;
use Symfony\Component\ErrorHandler\Debug;
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__.'/vendor/autoload.php';

$request = Request::createFromGlobals();

Debug::enable();

$application = new Calculator();

$response = $application->handle($request);

$response->send();
