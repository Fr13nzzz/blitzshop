<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * @Route("/admin")
 */
class BackendController extends AbstractController
{
    /**
     * @Route("/login", name="shop_backend_login")
     */
    public function indexAction(AuthenticationUtils $authenticationUtils): Response
    {
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();
        return $this->render('templates/backend/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    /**
     * @Route("/home", name="backend_home")
     */
    public function homeAction(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('templates/backend/home.html.twig');
    }
}