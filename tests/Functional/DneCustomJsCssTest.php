<?php

class DneCustomJsCssTest extends PHPUnit\Framework\TestCase
{
    /**
     * @var \Shopware\Components\Theme\Compiler
     */
    private $compiler;

    /**
     * @var \Doctrine\DBAL\Connection
     */
    private $connection;

    /**
     * @var \Shopware\Components\Theme\PathResolver
     */
    private $pathResolver;

    /**
     * @var \Shopware\Models\Shop\Shop
     */
    private $shop;

    /*
     * @var string
     */
    private $timeStamp;

    /*
     * @var string
     */
    private $testKey;

    public function setUp(): void
    {
        parent::setUp();

        $this->compiler = Shopware()->Container()->get('theme_compiler');
        $this->connection = Shopware()->Container()->get('dbal_connection');
        $this->pathResolver = Shopware()->Container()->get('theme_path_resolver');
        $this->testKey = 'test' . uniqid();

        /** @var \Shopware\Models\Shop\Repository $shopRepository */
        $shopRepository = Shopware()->Models()->getRepository('Shopware\Models\Shop\Shop');
        $this->shop = $shopRepository->getActiveDefault();

        $this->connection->delete(
            'dne_custom_js_css',
            ['id' => 1]
        );
        $this->connection->insert(
            'dne_custom_js_css',
            [
                'id' => 1,
                'name' => 'unit test',
                'active' => 1,
                'shopIds' => $this->shop->getId(),
                'css' => '#' . $this->testKey . ' { display: block; }',
                'js' => 'console.log(\'' . $this->testKey . '\')',
            ]
        );

        $this->timeStamp = $this->compiler->getThemeTimestamp($this->shop);

        $this->compiler->compileLess($this->timeStamp, $this->shop->getTemplate(), $this->shop);
        $this->compiler->compileJavascript($this->timeStamp, $this->shop->getTemplate(), $this->shop);
    }

    public function testCustomJsCompile()
    {
        $jsPath = $this->pathResolver->getJsFilePath($this->shop, $this->timeStamp);
        $js = file_get_contents($jsPath);

        $this->assertTrue(strpos($js, $this->testKey) !== false);
    }

    public function testCustomLessCompile()
    {
        $cssPath = $this->pathResolver->getCssFilePath($this->shop, $this->timeStamp);
        $css = file_get_contents($cssPath);

        $this->assertTrue(strpos($css, '#' . $this->testKey) !== false);
    }
}
