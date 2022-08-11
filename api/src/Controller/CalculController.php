<?php

namespace App\Controller;

use App\Manager\Calculator;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations\RequestParam;

use Throwable;

class CalculController extends AbstractController
{
    #[Route('/calcul', name: 'app_calcul', methods: 'POST')]
    #[RequestParam(name: 'input')]
    public function index(ParamFetcher $paramFetcher,Calculator $calculator): View
    {
        $input = $paramFetcher->get('input');

        $view = View::create();

        try {

            $result = $calculator->execute($input);

            $response = [
                'result' => $result,
            ];

        } catch (Throwable $e) {
            $response = [
                'error' => $e->getMessage()
            ];

            $view->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $view->setData($response);

        return $view;
    }
}
