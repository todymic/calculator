<?php

namespace App\Controller;

use App\Entity\User;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/users', name: 'app_user', methods: 'GET')]
#[isGranted('IS_AUTHENTICATED_FULLY')]
class UserController extends AbstractController
{
    use ControllerTrait;

    #[Get('/{id}', name: 'profil')]
    public function profile(User $user, SerializerInterface $serializer): View
    {
        $response = json_decode($serializer->serialize($user, 'json', [AbstractNormalizer::GROUPS => 'get_user']), true);

        return $this->view($response);
    }

}
