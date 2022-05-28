<?php

namespace App\Controller;

use App\Manager\Calculator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CalculController extends AbstractController
{
    #[Route('/calcul', name: 'app_calcul')]
    public function index(Request $request, Calculator $calculator): JsonResponse
    {
	    $input = '';

		if($content = $request->getContent()) {
			$input = json_decode($content, true);
		}

	    $result = $calculator->execute($input['input']);

        return $this->json([
            'result' => $result,
        ]);
    }
}
