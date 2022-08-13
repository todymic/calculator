<?php

namespace App\Controller;

use App\Manager\Calculator;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Throwable;

#[IsGranted('IS_AUTHENTICATED_FULLY')]
class CalculController extends AbstractController
{
    use ControllerTrait;

    #[Post('/calcul', name: 'app_calcul')]
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
                'error' => $e->getMessage(),
            ];

            return $this->view($response, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
