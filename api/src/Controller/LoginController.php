<?php

namespace App\Controller;

use App\Entity\User;
use Exception;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    use ControllerTrait;

    /**
     * @throws Exception
     */
    #[Route('/login', name: 'api_login', methods: 'GET')]
    public function index(): View
    {
        /** @var User $user */
        $user = $this->getUser();

        if (null === $user) {
            return $this->view([
                'message' => $user,
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->view([
            'user' => $user->getEmail(),
            'token' => $user->getApiToken(),
        ]);
    }
}
