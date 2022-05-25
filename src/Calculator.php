<?php

namespace App;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Calculator
{
	public function handle(Request $request): Response
	{

		dd($request);
		return new JsonResponse('ok');
	}
}
