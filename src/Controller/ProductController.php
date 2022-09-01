<?php

declare(strict_types=1);
namespace App\Controller;

use App\Entity\Product;
use App\Form\Type\ProductType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('admin/product')]
class ProductController extends AbstractController
{
    #[Route('', name: 'list_backend_products', methods: ['GET'])]
    public function listProducts(EntityManagerInterface $em): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $productRepository = $em->getRepository(Product::class);
        $products = [
            'active' => $productRepository->findBy(['hidden' => 0, 'deleted' => 0]),
            'hidden' => $productRepository->findBy(['hidden' => 1]),
            'deleted' => $productRepository->findBy(['deleted' => 1]),
        ];

        return $this->render('templates/backend/modules/product/products.html.twig', [
            'products' => $products,
            'productAmount' => count($products),
        ]);
    }

    #[Route('/create', name: 'create_product', methods: ['POST', 'GET'])]
    public function createProductAction(EntityManagerInterface $em, Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $task = $form->getData();
            $task->setHidden(1)
                ->setDeleted(0);

            $em->persist($task);
            $em->flush();
            return $this->redirectToRoute('list_backend_products');
        }

        return $this->renderForm('templates/backend/modules/product/new.html.twig', ['form' => $form]);
    }
}