<?php

namespace DneCustomJsCss\Services;

use Shopware\Components\ShopwareReleaseStruct;
use Shopware\Components\Theme\Compiler;
use Shopware\Components\Theme\Compressor\CompressorInterface;
use Shopware\Components\Theme\Inheritance;
use Shopware\Components\Theme\LessCompiler;
use Shopware\Components\Theme\PathResolver;
use Shopware\Components\Theme\Service;
use Shopware\Components\Theme\TimestampPersistor;
use Shopware\Models\Shop\Shop;
use Shopware\Models\Shop\Template;

class ThemeCompiler extends Compiler
{
    /**
     * @var CompressorDecorator
     */
    private $compressor;

    /**
     * @var LessCompilerDecorator
     */
    private $lessCompiler;

    /**
     * ThemeCompilerDecorator constructor.
     *
     * {@inheritdoc}
     */
    public function __construct(
        $rootDir,
        LessCompiler $compiler,
        PathResolver $pathResolver,
        Inheritance $inheritance,
        Service $service,
        CompressorInterface $jsCompressor,
        \Enlight_Event_EventManager $eventManager,
        TimestampPersistor $timestampPersistor,
        ShopwareReleaseStruct $release
    ) {
        $this->compressor = $jsCompressor;
        $this->lessCompiler = $compiler;

        parent::__construct(...func_get_args());
    }

    /**
     * {@inheritdoc}
     */
    public function compileJavascript($timestamp, Template $template, Shop $shop)
    {
        $this->compressor->setShop($shop);

        parent::compileJavascript($timestamp, $template, $shop);
    }

    /**
     * {@inheritdoc}
     */
    public function compileLess($timestamp, Template $template, Shop $shop)
    {
        $this->lessCompiler->setShop($shop);

        parent::compileLess($timestamp, $template, $shop);
    }
}
