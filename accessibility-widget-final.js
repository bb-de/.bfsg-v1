(function() {
  // Widget-Styles
  const widgetStyles = `
    .a11y-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #0066ff;
      border: none;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      cursor: pointer;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .a11y-widget-button:hover {
      transform: scale(1.1);
    }
    
    .a11y-widget-button-icon {
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-15c-.83 0-1.5.67-1.5 1.5S10.67 8 11.5 8 13 7.33 13 6.5 12.33 5 11.5 5zm-1 4.5v6H12v-2h1v2h1.5v-6h-4z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    
    .a11y-widget-panel {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      max-height: 570px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      overflow: hidden;
      z-index: 9998;
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .a11y-widget-panel.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
    
    .a11y-widget-panel-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .a11y-widget-panel-title {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }
    
    .a11y-widget-panel-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .a11y-widget-panel-close:hover {
      background-color: #f5f5f5;
    }
    
    .a11y-widget-panel-content {
      padding: 16px;
      max-height: 500px;
      overflow-y: auto;
    }
    
    .a11y-widget-section {
      margin-bottom: 24px;
    }
    
    .a11y-widget-section-title {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .a11y-widget-option-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    
    .a11y-widget-option {
      display: flex;
      align-items: center;
    }
    
    .a11y-widget-checkbox {
      margin-right: 8px;
    }
    
    .a11y-widget-label {
      font-size: 14px;
    }
    
    .a11y-widget-profile-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    
    .a11y-widget-profile-button {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .a11y-widget-profile-button:hover,
    .a11y-widget-profile-button.active {
      background-color: #0066ff;
      border-color: #0066ff;
      color: white;
    }
    
    .a11y-widget-select {
      width: 100%;
      padding: 8px;
      margin-top: 6px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    
    .a11y-widget-reset {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 20px;
      transition: all 0.2s ease;
    }
    
    .a11y-widget-reset:hover {
      background-color: #e5e5e5;
    }
    
    .a11y-reading-guide {
      position: fixed;
      left: 0;
      width: 100%;
      height: 30px;
      background: rgba(255, 255, 0, 0.2);
      pointer-events: none;
      z-index: 9998;
      display: none;
    }
    
    body.a11y-reading-guide-active .a11y-reading-guide {
      display: block;
    }
    
    /* Barrierefreiheit-Stile für den Inhalt */
    body.a11y-dark-contrast {
      filter: invert(1) hue-rotate(180deg);
      background: #000;
    }
    
    body.a11y-light-contrast {
      background: #fff;
      color: #000;
    }
    
    body.a11y-high-saturation {
      filter: saturate(200%);
    }
    
    body.a11y-monochrome {
      filter: grayscale(100%);
    }
    
    body.a11y-font-medium {
      font-size: 120% !important;
    }
    
    body.a11y-font-large {
      font-size: 150% !important;
    }
    
    body.a11y-font-xlarge {
      font-size: 200% !important;
    }
    
    body.a11y-line-spacing-medium p, 
    body.a11y-line-spacing-medium h1, 
    body.a11y-line-spacing-medium h2, 
    body.a11y-line-spacing-medium h3, 
    body.a11y-line-spacing-medium h4, 
    body.a11y-line-spacing-medium h5, 
    body.a11y-line-spacing-medium h6, 
    body.a11y-line-spacing-medium li, 
    body.a11y-line-spacing-medium span {
      line-height: 1.8 !important;
    }
    
    body.a11y-line-spacing-large p, 
    body.a11y-line-spacing-large h1, 
    body.a11y-line-spacing-large h2, 
    body.a11y-line-spacing-large h3, 
    body.a11y-line-spacing-large h4, 
    body.a11y-line-spacing-large h5, 
    body.a11y-line-spacing-large h6, 
    body.a11y-line-spacing-large li, 
    body.a11y-line-spacing-large span {
      line-height: 2.2 !important;
    }
    
    body.a11y-letter-spacing-medium p, 
    body.a11y-letter-spacing-medium h1, 
    body.a11y-letter-spacing-medium h2, 
    body.a11y-letter-spacing-medium h3, 
    body.a11y-letter-spacing-medium h4, 
    body.a11y-letter-spacing-medium h5, 
    body.a11y-letter-spacing-medium h6, 
    body.a11y-letter-spacing-medium li, 
    body.a11y-letter-spacing-medium span {
      letter-spacing: 1px !important;
    }
    
    body.a11y-letter-spacing-large p, 
    body.a11y-letter-spacing-large h1, 
    body.a11y-letter-spacing-large h2, 
    body.a11y-letter-spacing-large h3, 
    body.a11y-letter-spacing-large h4, 
    body.a11y-letter-spacing-large h5, 
    body.a11y-letter-spacing-large h6, 
    body.a11y-letter-spacing-large li, 
    body.a11y-letter-spacing-large span {
      letter-spacing: 2px !important;
    }
    
    body.a11y-large-cursor * {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M7 22l1.092-7L2 9l16.178 4.615L7 22z'/%3E%3C/svg%3E"), auto !important;
    }
    
    .reading-mask-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
    }
  `;
  
  // Standardeinstellungen
  const defaultSettings = {
    darkContrast: false,
    lightContrast: false,
    highSaturation: false,
    monochrome: false,
    fontSize: 'default',
    lineSpacing: 'default',
    letterSpacing: 'default',
    readingGuide: false,
    largeCursor: false,
    readingMask: false
  };
  
  // Zustand des Widgets
  let accessibilityState = {
    settings: {...defaultSettings},
    activeProfile: null
  };
  
  // Gespeicherte Einstellungen laden
  try {
    const savedSettings = localStorage.getItem('a11y-widget-settings');
    if (savedSettings) {
      accessibilityState.settings = JSON.parse(savedSettings);
    }
  } catch (e) {
    console.error('Fehler beim Laden der gespeicherten Einstellungen:', e);
  }
  
  // Profil anwenden
  function applyProfile(profileName) {
    // Einstellungen zurücksetzen
    accessibilityState.settings = {...defaultSettings};
    
    // Profil anwenden
    switch (profileName) {
      case 'visual-impairment':
        accessibilityState.settings.fontSize = 'large';
        accessibilityState.settings.lineSpacing = 'medium';
        break;
      case 'cognitive-disability':
        accessibilityState.settings.fontSize = 'medium';
        accessibilityState.settings.lineSpacing = 'large';
        accessibilityState.settings.letterSpacing = 'medium';
        break;
      case 'adhd-friendly':
        accessibilityState.settings.readingMask = true;
        break;
    }
    
    accessibilityState.activeProfile = profileName;
    applySettings();
  }
  
  // Einstellung umschalten
  function toggleSetting(setting) {
    accessibilityState.settings[setting] = !accessibilityState.settings[setting];
    accessibilityState.activeProfile = null; // Aktives Profil zurücksetzen, wenn Einstellungen geändert werden
    applySettings();
  }
  
  // Einstellung aktualisieren
  function updateSetting(setting, value) {
    accessibilityState.settings[setting] = value;
    accessibilityState.activeProfile = null; // Aktives Profil zurücksetzen, wenn Einstellungen geändert werden
    applySettings();
  }
  
  // Einstellungen zurücksetzen
  function resetSettings() {
    accessibilityState = {
      settings: {...defaultSettings},
      activeProfile: null
    };
    applySettings();
    
    // UI-Elemente entfernen
    removeReadingGuide();
    removeReadingMask();
  }
  
  // Widget erstellen
  function createAccessibilityWidget() {
    // CSS hinzufügen
    const style = document.createElement('style');
    style.textContent = widgetStyles;
    document.head.appendChild(style);
    
    // Widget-Button erstellen
    const button = document.createElement('button');
    button.className = 'a11y-widget-button';
    button.setAttribute('aria-label', 'Barrierefreiheit-Optionen öffnen');
    button.setAttribute('title', 'Barrierefreiheit-Optionen');
    
    const buttonIcon = document.createElement('div');
    buttonIcon.className = 'a11y-widget-button-icon';
    button.appendChild(buttonIcon);
    
    // Panel erstellen
    const panel = document.createElement('div');
    panel.className = 'a11y-widget-panel';
    
    // Panel-Header
    const panelHeader = document.createElement('div');
    panelHeader.className = 'a11y-widget-panel-header';
    
    const panelTitle = document.createElement('h2');
    panelTitle.className = 'a11y-widget-panel-title';
    panelTitle.textContent = 'Barrierefreiheit-Einstellungen';
    panelHeader.appendChild(panelTitle);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'a11y-widget-panel-close';
    closeButton.setAttribute('aria-label', 'Barrierefreiheit-Panel schließen');
    closeButton.innerHTML = '&times;';
    panelHeader.appendChild(closeButton);
    
    panel.appendChild(panelHeader);
    
    // Panel-Inhalt
    const panelContent = document.createElement('div');
    panelContent.className = 'a11y-widget-panel-content';
    
    // Profil-Sektion
    const profileSection = document.createElement('div');
    profileSection.className = 'a11y-widget-section';
    
    const profileTitle = document.createElement('h3');
    profileTitle.className = 'a11y-widget-section-title';
    profileTitle.textContent = 'Barrierefreiheit-Profile';
    profileSection.appendChild(profileTitle);
    
    const profileButtons = document.createElement('div');
    profileButtons.className = 'a11y-widget-profile-buttons';
    
    // Profile-Buttons erstellen
    const profiles = [
      { id: 'visual-impairment', name: 'Sehbehinderung' },
      { id: 'cognitive-disability', name: 'Kognitive Behinderung' },
      { id: 'adhd-friendly', name: 'ADHS-freundlich' }
    ];
    
    profiles.forEach(profile => {
      const button = document.createElement('button');
      button.className = 'a11y-widget-profile-button';
      button.setAttribute('data-profile', profile.id);
      button.textContent = profile.name;
      
      if (accessibilityState.activeProfile === profile.id) {
        button.classList.add('active');
      }
      
      button.addEventListener('click', function() {
        document.querySelectorAll('.a11y-widget-profile-button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        if (accessibilityState.activeProfile !== profile.id) {
          button.classList.add('active');
          applyProfile(profile.id);
        } else {
          // Bereits aktives Profil deaktivieren
          resetSettings();
        }
        
        updateUIState();
      });
      
      profileButtons.appendChild(button);
    });
    
    profileSection.appendChild(profileButtons);
    panelContent.appendChild(profileSection);
    
    // Anpassungen-Sektion
    const adjustmentsSection = document.createElement('div');
    adjustmentsSection.className = 'a11y-widget-section';
    
    const adjustmentsTitle = document.createElement('h3');
    adjustmentsTitle.className = 'a11y-widget-section-title';
    adjustmentsTitle.textContent = 'Anpassungen';
    adjustmentsSection.appendChild(adjustmentsTitle);
    
    // Optionen für Kontrast
    const contrastOptions = document.createElement('div');
    contrastOptions.className = 'a11y-widget-option-grid';
    
    // Dunkler Kontrast
    const darkContrastOption = document.createElement('div');
    darkContrastOption.className = 'a11y-widget-option';
    
    const darkContrastCheckbox = document.createElement('input');
    darkContrastCheckbox.className = 'a11y-widget-checkbox';
    darkContrastCheckbox.type = 'checkbox';
    darkContrastCheckbox.id = 'a11y-dark-contrast';
    darkContrastCheckbox.checked = accessibilityState.settings.darkContrast;
    
    darkContrastCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Andere Kontrastoptionen deaktivieren
        document.getElementById('a11y-light-contrast').checked = false;
        document.getElementById('a11y-monochrome').checked = false;
        document.getElementById('a11y-high-saturation').checked = false;
        
        // Einstellungen aktualisieren
        updateSetting('lightContrast', false);
        updateSetting('monochrome', false);
        updateSetting('highSaturation', false);
      }
      
      toggleSetting('darkContrast');
      updateUIState();
    });
    
    const darkContrastLabel = document.createElement('label');
    darkContrastLabel.className = 'a11y-widget-label';
    darkContrastLabel.htmlFor = 'a11y-dark-contrast';
    darkContrastLabel.textContent = 'Dunkler Kontrast';
    
    darkContrastOption.appendChild(darkContrastCheckbox);
    darkContrastOption.appendChild(darkContrastLabel);
    contrastOptions.appendChild(darkContrastOption);
    
    // Heller Kontrast
    const lightContrastOption = document.createElement('div');
    lightContrastOption.className = 'a11y-widget-option';
    
    const lightContrastCheckbox = document.createElement('input');
    lightContrastCheckbox.className = 'a11y-widget-checkbox';
    lightContrastCheckbox.type = 'checkbox';
    lightContrastCheckbox.id = 'a11y-light-contrast';
    lightContrastCheckbox.checked = accessibilityState.settings.lightContrast;
    
    lightContrastCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Andere Kontrastoptionen deaktivieren
        document.getElementById('a11y-dark-contrast').checked = false;
        document.getElementById('a11y-monochrome').checked = false;
        document.getElementById('a11y-high-saturation').checked = false;
        
        // Einstellungen aktualisieren
        updateSetting('darkContrast', false);
        updateSetting('monochrome', false);
        updateSetting('highSaturation', false);
      }
      
      toggleSetting('lightContrast');
      updateUIState();
    });
    
    const lightContrastLabel = document.createElement('label');
    lightContrastLabel.className = 'a11y-widget-label';
    lightContrastLabel.htmlFor = 'a11y-light-contrast';
    lightContrastLabel.textContent = 'Heller Kontrast';
    
    lightContrastOption.appendChild(lightContrastCheckbox);
    lightContrastOption.appendChild(lightContrastLabel);
    contrastOptions.appendChild(lightContrastOption);
    
    // Monochrom
    const monochromeOption = document.createElement('div');
    monochromeOption.className = 'a11y-widget-option';
    
    const monochromeCheckbox = document.createElement('input');
    monochromeCheckbox.className = 'a11y-widget-checkbox';
    monochromeCheckbox.type = 'checkbox';
    monochromeCheckbox.id = 'a11y-monochrome';
    monochromeCheckbox.checked = accessibilityState.settings.monochrome;
    
    monochromeCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Andere Kontrastoptionen deaktivieren
        document.getElementById('a11y-dark-contrast').checked = false;
        document.getElementById('a11y-light-contrast').checked = false;
        document.getElementById('a11y-high-saturation').checked = false;
        
        // Einstellungen aktualisieren
        updateSetting('darkContrast', false);
        updateSetting('lightContrast', false);
        updateSetting('highSaturation', false);
      }
      
      toggleSetting('monochrome');
      updateUIState();
    });
    
    const monochromeLabel = document.createElement('label');
    monochromeLabel.className = 'a11y-widget-label';
    monochromeLabel.htmlFor = 'a11y-monochrome';
    monochromeLabel.textContent = 'Monochrom';
    
    monochromeOption.appendChild(monochromeCheckbox);
    monochromeOption.appendChild(monochromeLabel);
    contrastOptions.appendChild(monochromeOption);
    
    // Hohe Sättigung
    const highSaturationOption = document.createElement('div');
    highSaturationOption.className = 'a11y-widget-option';
    
    const highSaturationCheckbox = document.createElement('input');
    highSaturationCheckbox.className = 'a11y-widget-checkbox';
    highSaturationCheckbox.type = 'checkbox';
    highSaturationCheckbox.id = 'a11y-high-saturation';
    highSaturationCheckbox.checked = accessibilityState.settings.highSaturation;
    
    highSaturationCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Andere Kontrastoptionen deaktivieren
        document.getElementById('a11y-dark-contrast').checked = false;
        document.getElementById('a11y-light-contrast').checked = false;
        document.getElementById('a11y-monochrome').checked = false;
        
        // Einstellungen aktualisieren
        updateSetting('darkContrast', false);
        updateSetting('lightContrast', false);
        updateSetting('monochrome', false);
      }
      
      toggleSetting('highSaturation');
      updateUIState();
    });
    
    const highSaturationLabel = document.createElement('label');
    highSaturationLabel.className = 'a11y-widget-label';
    highSaturationLabel.htmlFor = 'a11y-high-saturation';
    highSaturationLabel.textContent = 'Hohe Sättigung';
    
    highSaturationOption.appendChild(highSaturationCheckbox);
    highSaturationOption.appendChild(highSaturationLabel);
    contrastOptions.appendChild(highSaturationOption);
    
    adjustmentsSection.appendChild(contrastOptions);
    
    // Schriftgröße
    const fontSizeDiv = document.createElement('div');
    fontSizeDiv.className = 'a11y-widget-option';
    fontSizeDiv.style.marginTop = '16px';
    
    const fontSizeLabel = document.createElement('label');
    fontSizeLabel.className = 'a11y-widget-label';
    fontSizeLabel.htmlFor = 'a11y-font-size';
    fontSizeLabel.textContent = 'Schriftgröße';
    fontSizeDiv.appendChild(fontSizeLabel);
    
    const fontSizeSelect = document.createElement('select');
    fontSizeSelect.className = 'a11y-widget-select';
    fontSizeSelect.id = 'a11y-font-size';
    
    const fontSizes = [
      { value: 'default', text: 'Standard' },
      { value: 'medium', text: 'Mittel (120%)' },
      { value: 'large', text: 'Groß (150%)' },
      { value: 'xlarge', text: 'Sehr groß (200%)' }
    ];
    
    fontSizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size.value;
      option.textContent = size.text;
      
      if (accessibilityState.settings.fontSize === size.value) {
        option.selected = true;
      }
      
      fontSizeSelect.appendChild(option);
    });
    
    fontSizeSelect.addEventListener('change', function() {
      updateSetting('fontSize', this.value);
      updateUIState();
    });
    
    fontSizeDiv.appendChild(fontSizeSelect);
    adjustmentsSection.appendChild(fontSizeDiv);
    
    // Zeilenabstand
    const lineSpacingDiv = document.createElement('div');
    lineSpacingDiv.className = 'a11y-widget-option';
    lineSpacingDiv.style.marginTop = '16px';
    
    const lineSpacingLabel = document.createElement('label');
    lineSpacingLabel.className = 'a11y-widget-label';
    lineSpacingLabel.htmlFor = 'a11y-line-spacing';
    lineSpacingLabel.textContent = 'Zeilenabstand';
    lineSpacingDiv.appendChild(lineSpacingLabel);
    
    const lineSpacingSelect = document.createElement('select');
    lineSpacingSelect.className = 'a11y-widget-select';
    lineSpacingSelect.id = 'a11y-line-spacing';
    
    const lineSpacings = [
      { value: 'default', text: 'Standard' },
      { value: 'medium', text: 'Mittel (1.8)' },
      { value: 'large', text: 'Groß (2.2)' }
    ];
    
    lineSpacings.forEach(spacing => {
      const option = document.createElement('option');
      option.value = spacing.value;
      option.textContent = spacing.text;
      
      if (accessibilityState.settings.lineSpacing === spacing.value) {
        option.selected = true;
      }
      
      lineSpacingSelect.appendChild(option);
    });
    
    lineSpacingSelect.addEventListener('change', function() {
      updateSetting('lineSpacing', this.value);
      updateUIState();
    });
    
    lineSpacingDiv.appendChild(lineSpacingSelect);
    adjustmentsSection.appendChild(lineSpacingDiv);
    
    // Buchstabenabstand
    const letterSpacingDiv = document.createElement('div');
    letterSpacingDiv.className = 'a11y-widget-option';
    letterSpacingDiv.style.marginTop = '16px';
    
    const letterSpacingLabel = document.createElement('label');
    letterSpacingLabel.className = 'a11y-widget-label';
    letterSpacingLabel.htmlFor = 'a11y-letter-spacing';
    letterSpacingLabel.textContent = 'Buchstabenabstand';
    letterSpacingDiv.appendChild(letterSpacingLabel);
    
    const letterSpacingSelect = document.createElement('select');
    letterSpacingSelect.className = 'a11y-widget-select';
    letterSpacingSelect.id = 'a11y-letter-spacing';
    
    const letterSpacings = [
      { value: 'default', text: 'Standard' },
      { value: 'medium', text: 'Mittel (1px)' },
      { value: 'large', text: 'Groß (2px)' }
    ];
    
    letterSpacings.forEach(spacing => {
      const option = document.createElement('option');
      option.value = spacing.value;
      option.textContent = spacing.text;
      
      if (accessibilityState.settings.letterSpacing === spacing.value) {
        option.selected = true;
      }
      
      letterSpacingSelect.appendChild(option);
    });
    
    letterSpacingSelect.addEventListener('change', function() {
      updateSetting('letterSpacing', this.value);
      updateUIState();
    });
    
    letterSpacingDiv.appendChild(letterSpacingSelect);
    adjustmentsSection.appendChild(letterSpacingDiv);
    
    panelContent.appendChild(adjustmentsSection);
    
    // Leseunterstützung-Sektion
    const readingSection = document.createElement('div');
    readingSection.className = 'a11y-widget-section';
    
    const readingTitle = document.createElement('h3');
    readingTitle.className = 'a11y-widget-section-title';
    readingTitle.textContent = 'Leseunterstützung';
    readingSection.appendChild(readingTitle);
    
    const readingOptions = document.createElement('div');
    readingOptions.className = 'a11y-widget-option-grid';
    
    // Leseführung
    const readingGuideOption = document.createElement('div');
    readingGuideOption.className = 'a11y-widget-option';
    
    const readingGuideCheckbox = document.createElement('input');
    readingGuideCheckbox.className = 'a11y-widget-checkbox';
    readingGuideCheckbox.type = 'checkbox';
    readingGuideCheckbox.id = 'a11y-reading-guide';
    readingGuideCheckbox.checked = accessibilityState.settings.readingGuide;
    
    readingGuideCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Lesemaske deaktivieren
        document.getElementById('a11y-reading-mask').checked = false;
        updateSetting('readingMask', false);
      }
      
      toggleSetting('readingGuide');
      updateUIState();
    });
    
    const readingGuideLabel = document.createElement('label');
    readingGuideLabel.className = 'a11y-widget-label';
    readingGuideLabel.htmlFor = 'a11y-reading-guide';
    readingGuideLabel.textContent = 'Leseführung';
    
    readingGuideOption.appendChild(readingGuideCheckbox);
    readingGuideOption.appendChild(readingGuideLabel);
    readingOptions.appendChild(readingGuideOption);
    
    // Großer Cursor
    const largeCursorOption = document.createElement('div');
    largeCursorOption.className = 'a11y-widget-option';
    
    const largeCursorCheckbox = document.createElement('input');
    largeCursorCheckbox.className = 'a11y-widget-checkbox';
    largeCursorCheckbox.type = 'checkbox';
    largeCursorCheckbox.id = 'a11y-large-cursor';
    largeCursorCheckbox.checked = accessibilityState.settings.largeCursor;
    
    largeCursorCheckbox.addEventListener('change', function() {
      toggleSetting('largeCursor');
      updateUIState();
    });
    
    const largeCursorLabel = document.createElement('label');
    largeCursorLabel.className = 'a11y-widget-label';
    largeCursorLabel.htmlFor = 'a11y-large-cursor';
    largeCursorLabel.textContent = 'Großer Cursor';
    
    largeCursorOption.appendChild(largeCursorCheckbox);
    largeCursorOption.appendChild(largeCursorLabel);
    readingOptions.appendChild(largeCursorOption);
    
    // Lesemaske
    const readingMaskOption = document.createElement('div');
    readingMaskOption.className = 'a11y-widget-option';
    
    const readingMaskCheckbox = document.createElement('input');
    readingMaskCheckbox.className = 'a11y-widget-checkbox';
    readingMaskCheckbox.type = 'checkbox';
    readingMaskCheckbox.id = 'a11y-reading-mask';
    readingMaskCheckbox.checked = accessibilityState.settings.readingMask;
    
    readingMaskCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Leseführung deaktivieren
        document.getElementById('a11y-reading-guide').checked = false;
        updateSetting('readingGuide', false);
      }
      
      toggleSetting('readingMask');
      updateUIState();
    });
    
    const readingMaskLabel = document.createElement('label');
    readingMaskLabel.className = 'a11y-widget-label';
    readingMaskLabel.htmlFor = 'a11y-reading-mask';
    readingMaskLabel.textContent = 'Lesemaske';
    
    readingMaskOption.appendChild(readingMaskCheckbox);
    readingMaskOption.appendChild(readingMaskLabel);
    readingOptions.appendChild(readingMaskOption);
    
    readingSection.appendChild(readingOptions);
    panelContent.appendChild(readingSection);
    
    // Reset-Button
    const resetButton = document.createElement('button');
    resetButton.className = 'a11y-widget-reset';
    resetButton.textContent = 'Zurücksetzen';
    
    resetButton.addEventListener('click', function() {
      resetSettings();
      updateUIState();
    });
    
    panelContent.appendChild(resetButton);
    
    panel.appendChild(panelContent);
    
    // Elemente zum DOM hinzufügen
    document.body.appendChild(button);
    document.body.appendChild(panel);
    
    // Event-Listener für Button und Close-Button
    button.addEventListener('click', function() {
      panel.classList.toggle('open');
      button.setAttribute('aria-expanded', panel.classList.contains('open'));
    });
    
    closeButton.addEventListener('click', function() {
      panel.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
    
    // Leseführung erstellen
    if (accessibilityState.settings.readingGuide) {
      createReadingGuide();
    }
    
    // Lesemaske erstellen
    if (accessibilityState.settings.readingMask) {
      createReadingMask();
    }
    
    // Einstellungen anwenden
    applySettings();
    
    // UI-Zustand aktualisieren
    function updateUIState() {
      // UI-Elemente aktualisieren
      document.getElementById('a11y-dark-contrast').checked = accessibilityState.settings.darkContrast;
      document.getElementById('a11y-light-contrast').checked = accessibilityState.settings.lightContrast;
      document.getElementById('a11y-monochrome').checked = accessibilityState.settings.monochrome;
      document.getElementById('a11y-high-saturation').checked = accessibilityState.settings.highSaturation;
      document.getElementById('a11y-font-size').value = accessibilityState.settings.fontSize;
      document.getElementById('a11y-line-spacing').value = accessibilityState.settings.lineSpacing;
      document.getElementById('a11y-letter-spacing').value = accessibilityState.settings.letterSpacing;
      document.getElementById('a11y-reading-guide').checked = accessibilityState.settings.readingGuide;
      document.getElementById('a11y-large-cursor').checked = accessibilityState.settings.largeCursor;
      document.getElementById('a11y-reading-mask').checked = accessibilityState.settings.readingMask;
      
      // Profilbuttons aktualisieren
      document.querySelectorAll('.a11y-widget-profile-button').forEach(btn => {
        btn.classList.remove('active');
        
        if (btn.getAttribute('data-profile') === accessibilityState.activeProfile) {
          btn.classList.add('active');
        }
      });
    }
    
    return {
      updateUIState
    };
  }
  
  // Einstellungen anwenden
  function applySettings() {
    // Klassen entfernen
    document.body.classList.remove(
      'a11y-dark-contrast',
      'a11y-light-contrast',
      'a11y-high-saturation',
      'a11y-monochrome',
      'a11y-font-medium',
      'a11y-font-large',
      'a11y-font-xlarge',
      'a11y-line-spacing-medium',
      'a11y-line-spacing-large',
      'a11y-letter-spacing-medium',
      'a11y-letter-spacing-large',
      'a11y-reading-guide-active',
      'a11y-large-cursor'
    );
    
    // Dynamische Elemente entfernen
    removeReadingGuide();
    removeReadingMask();
    
    // Einstellungen anwenden
    if (accessibilityState.settings.darkContrast) {
      document.body.classList.add('a11y-dark-contrast');
    }
    
    if (accessibilityState.settings.lightContrast) {
      document.body.classList.add('a11y-light-contrast');
    }
    
    if (accessibilityState.settings.highSaturation) {
      document.body.classList.add('a11y-high-saturation');
    }
    
    if (accessibilityState.settings.monochrome) {
      document.body.classList.add('a11y-monochrome');
    }
    
    if (accessibilityState.settings.fontSize === 'medium') {
      document.body.classList.add('a11y-font-medium');
    } else if (accessibilityState.settings.fontSize === 'large') {
      document.body.classList.add('a11y-font-large');
    } else if (accessibilityState.settings.fontSize === 'xlarge') {
      document.body.classList.add('a11y-font-xlarge');
    }
    
    if (accessibilityState.settings.lineSpacing === 'medium') {
      document.body.classList.add('a11y-line-spacing-medium');
    } else if (accessibilityState.settings.lineSpacing === 'large') {
      document.body.classList.add('a11y-line-spacing-large');
    }
    
    if (accessibilityState.settings.letterSpacing === 'medium') {
      document.body.classList.add('a11y-letter-spacing-medium');
    } else if (accessibilityState.settings.letterSpacing === 'large') {
      document.body.classList.add('a11y-letter-spacing-large');
    }
    
    if (accessibilityState.settings.readingGuide) {
      document.body.classList.add('a11y-reading-guide-active');
      createReadingGuide();
    }
    
    if (accessibilityState.settings.largeCursor) {
      document.body.classList.add('a11y-large-cursor');
    }
    
    if (accessibilityState.settings.readingMask) {
      createReadingMask();
    }
    
    // Einstellungen speichern
    try {
      localStorage.setItem('a11y-widget-settings', JSON.stringify(accessibilityState.settings));
    } catch (e) {
      console.error('Fehler beim Speichern der Einstellungen:', e);
    }
  }
  
  // Leseführung erstellen
  function createReadingGuide() {
    if (document.querySelector('.a11y-reading-guide')) {
      return;
    }
    
    const guide = document.createElement('div');
    guide.className = 'a11y-reading-guide';
    document.body.appendChild(guide);
    
    document.addEventListener('mousemove', handleReadingGuideMouseMove);
  }
  
  // Leseführung entfernen
  function removeReadingGuide() {
    const guide = document.querySelector('.a11y-reading-guide');
    if (guide) {
      guide.remove();
      document.removeEventListener('mousemove', handleReadingGuideMouseMove);
    }
  }
  
  // Mausbewegung für Leseführung verarbeiten
  function handleReadingGuideMouseMove(e) {
    const guide = document.querySelector('.a11y-reading-guide');
    if (guide) {
      guide.style.top = `${e.clientY}px`;
    }
  }
  
  // Lesemaske erstellen
  function createReadingMask() {
    if (document.querySelector('.reading-mask-overlay')) {
      return;
    }
    
    const mask = document.createElement('div');
    mask.className = 'reading-mask-overlay';
    
    // Canvas für die Maske erstellen
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    mask.appendChild(canvas);
    
    document.body.appendChild(mask);
    
    // Canvas-Größe aktualisieren
    const ctx = canvas.getContext('2d');
    
    function updateCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawMask({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    function drawMask(e) {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dunkle Überlagerung
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Transparenter Kreis an der Cursor-Position
      const radius = 120;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
    
    document.addEventListener('mousemove', drawMask);
  }
  
  // Lesemaske entfernen
  function removeReadingMask() {
    const mask = document.querySelector('.reading-mask-overlay');
    if (mask) {
      mask.remove();
    }
  }
  
  // Widget initialisieren
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAccessibilityWidget);
  } else {
    createAccessibilityWidget();
  }
})();