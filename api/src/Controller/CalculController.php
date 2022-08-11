<?php

namespace App\Controller;

use App\Manager\Calculator;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations\RequestParam;

use Throwable;

class CalculController extends AbstractController
{
    use ControllerTrait;

    #[Route('/calcul', name: 'app_calcul', methods: 'POST')]
    #[RequestParam(name: 'input')]
    public function index(ParamFetcher $paramFetcher, Calculator $calculator): View
    {
        $input = $paramFetcher->get('input');
        try {
            $result = $calculator->execute($input);

            $response = [
                'result' => $result,
            ];
            return $this->view($response, Response::HTTP_CREATED);
        } catch (Throwable $e) {
            $response = [
                'error' => $e->getMessage()
            ];

            return $this->view($response, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
