<?php

use Symfony\Component\HttpFoundation\Request;

require_once __DIR__.'/../vendor/autoload.php';

$request = Request::createFromGlobals();

$application = new Calculator($request);

$response = $application->run();
$reponse->send();
