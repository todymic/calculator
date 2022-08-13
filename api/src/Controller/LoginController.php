<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use Exception;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\View\View as RestView;
use FOS\RestBundle\Controller\ControllerTrait;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

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

    /**
     * @throws Exception
     */
    #[Post('/register', name: 'register')]
    #[ParamConverter('user', options: [
        'deserializationContext' => ['groups' => ['post_user']],
    ], converter: 'fos_rest.request_body')]
    public function register(User $user, userManager $userManager, SerializerInterface $serializer, ConstraintViolationListInterface $validationErrors): RestView
    {

        if ($validationErrors->count() > 0) {
            return $this->view($validationErrors, Response::HTTP_BAD_REQUEST);
        }

        $user = $userManager->register($user);

        $response = json_decode($serializer->serialize($user, 'json', [AbstractNormalizer::GROUPS => 'get_user']), true);

        return $this->view($response);
    }
}
