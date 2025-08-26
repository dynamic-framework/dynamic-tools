// Enhanced Surprise Me function with ALL parameters
function surpriseMe() {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    // Show theme name with animation
    showThemeNotification(randomTheme.name, randomTheme.description);
    
    // Apply changes with slight delay for effect
    setTimeout(() => {
        // 1. COLORS - Apply theme colors
        Object.keys(randomTheme.colors).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = randomTheme.colors[key];
                const textInput = element.nextElementSibling;
                if (textInput && textInput.classList.contains('color-value')) {
                    textInput.value = randomTheme.colors[key];
                }
            }
        });
        
        // 2. LINKS & FOCUS - Derive from primary color
        const linkColor = document.getElementById('linkColor');
        if (linkColor) {
            linkColor.value = randomTheme.colors.primary;
            linkColor.nextElementSibling.value = randomTheme.colors.primary;
        }
        
        const linkHoverColor = document.getElementById('linkHoverColor');
        if (linkHoverColor) {
            const hoverColor = adjustBrightness(randomTheme.colors.primary, -15);
            linkHoverColor.value = hoverColor;
            linkHoverColor.nextElementSibling.value = hoverColor;
        }
        
        const focusRingColor = document.getElementById('focusRingColor');
        if (focusRingColor) {
            focusRingColor.value = randomTheme.colors.primary;
            focusRingColor.nextElementSibling.value = randomTheme.colors.primary;
        }
        
        // Focus ring width - subtle variations (2-4px)
        const focusRingWidth = document.getElementById('focusRingWidth');
        if (focusRingWidth) {
            const width = Math.floor(Math.random() * 3) + 2; // 2-4px
            focusRingWidth.value = width;
            document.getElementById('focusRingWidthValue').textContent = width + 'px';
        }
        
        // Focus ring opacity - professional range (0.2-0.3)
        const focusRingOpacity = document.getElementById('focusRingOpacity');
        if (focusRingOpacity) {
            const opacity = (Math.random() * 0.1 + 0.2).toFixed(2); // 0.2-0.3
            focusRingOpacity.value = opacity;
            document.getElementById('focusRingOpacityValue').textContent = opacity;
        }
        
        // 3. FORMS - Professional input styling
        const inputBg = document.getElementById('inputBg');
        if (inputBg) {
            inputBg.value = '#ffffff';
            inputBg.nextElementSibling.value = '#ffffff';
        }
        
        const inputBorderColor = document.getElementById('inputBorderColor');
        if (inputBorderColor) {
            const borderColor = adjustBrightness(randomTheme.colors.secondary, 30);
            inputBorderColor.value = borderColor;
            inputBorderColor.nextElementSibling.value = borderColor;
        }
        
        const inputFocusColor = document.getElementById('inputFocusColor');
        if (inputFocusColor) {
            inputFocusColor.value = randomTheme.colors.primary;
            inputFocusColor.nextElementSibling.value = randomTheme.colors.primary;
        }
        
        // Input padding - professional range
        const inputPaddingY = document.getElementById('inputPaddingY');
        if (inputPaddingY) {
            const paddingY = Math.floor(Math.random() * 4) + 6; // 6-9px
            inputPaddingY.value = paddingY;
            document.getElementById('inputPaddingYValue').textContent = paddingY + 'px';
        }
        
        const inputPaddingX = document.getElementById('inputPaddingX');
        if (inputPaddingX) {
            const paddingX = Math.floor(Math.random() * 6) + 10; // 10-15px
            inputPaddingX.value = paddingX;
            document.getElementById('inputPaddingXValue').textContent = paddingX + 'px';
        }
        
        // 4. TYPOGRAPHY - Professional font choices
        const fonts = [
            "'Inter', sans-serif",
            "'Roboto', sans-serif", 
            "'Open Sans', sans-serif",
            "'Poppins', sans-serif",
            "'DM Sans', sans-serif",
            "'Plus Jakarta Sans', sans-serif"
        ];
        const fontFamily = document.getElementById('fontFamily');
        if (fontFamily) {
            fontFamily.value = fonts[Math.floor(Math.random() * fonts.length)];
        }
        
        // Font size - readable range (15-18px)
        const fontSize = document.getElementById('fontSize');
        if (fontSize) {
            const size = Math.floor(Math.random() * 4) + 15; // 15-18px
            fontSize.value = size;
            document.getElementById('fontSizeValue').textContent = size + 'px';
        }
        
        // Font weight - professional range (400-500)
        const fontWeight = document.getElementById('fontWeight');
        if (fontWeight) {
            const weight = Math.random() > 0.5 ? 400 : 500;
            fontWeight.value = weight;
            document.getElementById('fontWeightValue').textContent = weight;
        }
        
        // Heading weight - strong but not too bold (500-600)
        const headingWeight = document.getElementById('headingWeight');
        if (headingWeight) {
            const weight = Math.random() > 0.5 ? 500 : 600;
            headingWeight.value = weight;
            document.getElementById('headingWeightValue').textContent = weight;
        }
        
        // Line height - comfortable reading (1.4-1.6)
        const lineHeight = document.getElementById('lineHeight');
        if (lineHeight) {
            const height = (Math.random() * 0.2 + 1.4).toFixed(2); // 1.4-1.6
            lineHeight.value = height;
            document.getElementById('lineHeightValue').textContent = height;
        }
        
        // Letter spacing - subtle (-0.01 to 0.01)
        const letterSpacing = document.getElementById('letterSpacing');
        if (letterSpacing) {
            const spacing = (Math.random() * 0.02 - 0.01).toFixed(3); // -0.01 to 0.01
            letterSpacing.value = spacing;
            document.getElementById('letterSpacingValue').textContent = spacing + 'em';
        }
        
        // 5. BORDERS - Match theme style
        const borderStyles = ['sharp', 'subtle', 'rounded'];
        const styleChoice = borderStyles[Math.floor(Math.random() * borderStyles.length)];
        
        const borderRadius = document.getElementById('borderRadius');
        if (borderRadius) {
            let radius;
            switch(styleChoice) {
                case 'sharp': radius = Math.floor(Math.random() * 3); break; // 0-2px
                case 'subtle': radius = Math.floor(Math.random() * 4) + 4; break; // 4-7px
                case 'rounded': radius = Math.floor(Math.random() * 8) + 8; break; // 8-15px
            }
            borderRadius.value = radius;
            document.getElementById('borderRadiusValue').textContent = radius + 'px';
        }
        
        const borderRadiusSm = document.getElementById('borderRadiusSm');
        if (borderRadiusSm) {
            let radiusSm;
            switch(styleChoice) {
                case 'sharp': radiusSm = 0; break;
                case 'subtle': radiusSm = Math.floor(Math.random() * 2) + 2; break; // 2-3px
                case 'rounded': radiusSm = Math.floor(Math.random() * 3) + 4; break; // 4-6px
            }
            borderRadiusSm.value = radiusSm;
            document.getElementById('borderRadiusSmValue').textContent = radiusSm + 'px';
        }
        
        const borderRadiusLg = document.getElementById('borderRadiusLg');
        if (borderRadiusLg) {
            let radiusLg;
            switch(styleChoice) {
                case 'sharp': radiusLg = Math.floor(Math.random() * 2); break; // 0-1px
                case 'subtle': radiusLg = Math.floor(Math.random() * 4) + 6; break; // 6-9px
                case 'rounded': radiusLg = Math.floor(Math.random() * 8) + 12; break; // 12-19px
            }
            borderRadiusLg.value = radiusLg;
            document.getElementById('borderRadiusLgValue').textContent = radiusLg + 'px';
        }
        
        // Border width - usually 1px, sometimes 2px
        const borderWidth = document.getElementById('borderWidth');
        if (borderWidth) {
            const width = Math.random() > 0.8 ? 2 : 1;
            borderWidth.value = width;
            document.getElementById('borderWidthValue').textContent = width + 'px';
        }
        
        // 6. SHADOWS - Professional depth
        const shadowStyles = [
            'none',
            '0 1px 2px rgba(0,0,0,0.05)',
            '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            '0 4px 6px rgba(0,0,0,0.1)',
            '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
        ];
        
        const boxShadow = document.getElementById('boxShadow');
        if (boxShadow) {
            // Prefer subtle shadows
            const weights = [0.05, 0.25, 0.35, 0.25, 0.1]; // Probability weights
            const shadow = weightedRandom(shadowStyles, weights);
            boxShadow.value = shadow;
        }
        
        // 7. ANIMATIONS - Smooth and professional
        const transitionDuration = document.getElementById('transitionDuration');
        if (transitionDuration) {
            const durations = ['150ms', '300ms', '300ms', '500ms']; // Prefer 300ms
            transitionDuration.value = durations[Math.floor(Math.random() * durations.length)];
        }
        
        const transitionTiming = document.getElementById('transitionTiming');
        if (transitionTiming) {
            const timings = ['ease', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'];
            transitionTiming.value = timings[Math.floor(Math.random() * timings.length)];
        }
        
        const hoverScale = document.getElementById('hoverScale');
        if (hoverScale) {
            const scales = ['1', '1', '1.02', '1.05']; // Mostly no scale
            hoverScale.value = scales[Math.floor(Math.random() * scales.length)];
        }
        
        // 8. GRID SYSTEM - Keep standard but vary gutter
        const gridGutterWidth = document.getElementById('gridGutterWidth');
        if (gridGutterWidth) {
            const gutter = Math.floor(Math.random() * 5) * 4 + 16; // 16-32px in steps of 4
            gridGutterWidth.value = gutter;
            document.getElementById('gridGutterWidthValue').textContent = gutter + 'px';
        }
        
        // Update all variables
        updateColorInputs();
        updateCssVariables();
    }, 300);
}

// Helper function to adjust color brightness
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + 
        (R<255?R<1?0:R:255)*0x10000 + 
        (G<255?G<1?0:G:255)*0x100 + 
        (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// Helper function for weighted random selection
function weightedRandom(items, weights) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random < 0) {
            return items[i];
        }
    }
    return items[items.length - 1];
}

// Helper function to update color inputs
function updateColorInputs() {
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        const textInput = picker.nextElementSibling;
        if (textInput && textInput.classList.contains('color-value')) {
            textInput.value = picker.value;
        }
    });
}