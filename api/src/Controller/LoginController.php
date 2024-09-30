<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class LoginController extends AbstractController
{


    public function __construct(private readonly UserManager $userManager)
    {
    }

    /**
     * @throws Exception
     */
    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(?UserInterface $user): Response
    {
        if (null === $user) {
            return $this->json([
                'message' => 'User not found',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'user' => $this->userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']),
        ]);
    }

    /**
     * Register and return new user.
     *
     * @throws Exception
     */
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, userManager $userManager): Response
    {
        $params = json_decode($request->getContent(), true);
        $newuser = new User();
        $newuser->setEmail($params['email']);
        $newuser->setPassword($params['password']);
        $user = $userManager->register($newuser);

        return $this->json($userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']));
    }
}
