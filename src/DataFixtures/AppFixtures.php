<?php

namespace App\DataFixtures;

use App\Entity\BackendUser;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $backendAdmin = new BackendUser();
        $backendAdmin->setRoles(['ROLE_ADMIN'])
            ->setUsername('admin');
        $password = $this->hasher->hashPassword($backendAdmin, 'password');
        $backendAdmin->setPassword($password);
        $manager->persist($backendAdmin);

        $this->createProducts($manager);
        $manager->flush();
    }

    protected function createProducts(ObjectManager $manager): void
    {
        for ($i = 0; $i < 10; $i++) {
            $product = new Product();
            $product->setName($i)
                ->setDescription($i)
                ->setPrice($i);
            $manager->persist($product);
        }
    }
}
