<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use Exception;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\View\View as RestView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class LoginController extends AbstractController
{
    use ControllerTrait;

    public function __construct(private readonly UserManager $userManager)
    {
    }

    /**
     * @throws Exception
     */
    #[Post('/login', name: 'api_login')]
    public function login(?UserInterface $user): RestView
    {
        if (null === $user) {
            return $this->view([
                'message' => 'User not found',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->view([
            'user' => $this->userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']),
        ]);
    }

    /**
     * Register and return new user.
     *
     * @throws Exception
     */
    #[Post('/register', name: 'register')]
    #[ParamConverter('newUser', converter: 'fos_rest.request_body')]
    public function register(User $newUser, userManager $userManager, SerializerInterface $serializer, ConstraintViolationListInterface $validationErrors): RestView
    {
        if ($validationErrors->count() > 0) {
            return $this->view($validationErrors, Response::HTTP_BAD_REQUEST);
        }

        $user = $userManager->register($newUser);

        return $this->view($userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']));
    }
}
