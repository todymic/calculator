<?php

namespace App\Controller;

use App\Manager\Calculator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Throwable;

#[IsGranted('IS_AUTHENTICATED_FULLY')]
class CalculController extends AbstractController
{

    #[Route('/calcul', name: 'app_calcul', methods: ['POST'])]
    public function index(Request $request, Calculator $calculator): Response
    {
        $params = json_decode($request->getContent(), true);
        $input = $params['input'];
        try {
            $result = $calculator->execute($input);

            $response = [
                'result' => $result,
            ];

            return $this->json($response, Response::HTTP_CREATED);
        } catch (Throwable $e) {
            $response = [
                'error' => $e->getMessage(),
            ];

            return $this->json($response, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
