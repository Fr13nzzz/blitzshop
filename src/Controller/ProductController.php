<?php
declare(strict_types=1);

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("admin/product/")
 */
class ProductController extends AbstractController
{
    /**
     * @Route("", name="list_backend_products", methods={"GET"})
     */
    public function listProducts(ProductRepository $productRepository): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $products = $productRepository->findAll();
        return $this->render('templates/backend/modules/products.html.twig', [
            'products' => $products,
            'productAmount' => count($products),
        ]);
    }
}