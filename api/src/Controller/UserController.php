<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/users', name: 'app_user')]
#[isGranted('IS_AUTHENTICATED_FULLY')]
class UserController extends AbstractController
{
    use ControllerTrait;

    public function __construct(private readonly UserManager $userManager)
    {
    }

    #[Get('/{id}', name: 'profil', requirements: ['id' => "\d+"])]
    #[ParamConverter('user', class: User::class)]
    public function getProfile(User $user): View
    {
        $serializedUser = $this->userManager->serializeUser($user, [AbstractNormalizer::GROUPS => 'get_user']);

        return $this->view($serializedUser);
    }

    #[Route('/me', name: 'app_me', methods: 'GET')]
    public function getCurrentUser(): View
    {
        $serializedUser = $this->userManager->serializeUser($this->getUser(), [AbstractNormalizer::GROUPS => 'get_user']);

        return $this->view($serializedUser);
    }
}
