# Harbr Analytics Implementation Documentation

## Overview

This document outlines the comprehensive event tracking system implemented for Harbr using PostHog. The tracking system is designed to provide detailed insights into user behavior, form conversions, content engagement, and overall website performance to drive growth and optimize the user experience.

## Core Events Structure

All events follow a standardized schema with these base properties:

```javascript
{
  // Timestamp when the event occurred
  timestamp: "2023-05-15T14:22:35.215Z",
  
  // Page and device context
  url_path: "/start",
  url_host: "harbr.com",
  url_params: "?utm_source=google",
  viewport_width: 1440,
  viewport_height: 800,
  
  // Traffic source information
  referrer: "https://google.com",
  device_type: "desktop", // "mobile", "tablet", "desktop"
  
  // UTM parameters for campaign tracking
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "marina_launch",
  utm_content: "ad1",
  utm_term: "marina booking"
}
```

## Event Categories

### 1. Page View Tracking

**Event**: `page_viewed`

Fired when a user loads a page. Includes additional context:

```javascript
{
  page_name: "Home",
  page_title: "Harbr — Smart marina stays",
  page_section: "home",
  is_landing_page: true,
  previous_path: "/about"
}
```

### 2. Form Funnel Tracking

The signup form funnel is tracked using these events:

**Event**: `form_viewed`
- First step in the funnel
- Fired when the form is first loaded

**Event**: `form_step_changed`
- Step transitions in the form
- Used for funnel visualization in PostHog
- Important properties: `step_number: 2.0` or `step_number: 3.0`

**Event**: `form_completed`
- Final step in the funnel
- Indicates successful form submission

**Form Interaction Details**:

Additional detailed events track form interactions:

```javascript
// Field changes
form_field_change: {
  field_name: "email",
  field_type: "email",
  step_number: 1,
  has_value: true,
  value_length: 25,
  is_valid: true,
  is_required: true
}

// Form validation errors
form_validation_error: {
  step_number: 1,
  field: "email",
  error_message: "Email is required",
  time_spent_on_step: 45
}

// Field focus/blur time tracking
form_field_interaction: {
  field_name: "email",
  field_type: "email",
  time_spent: 12,
  step_number: 1,
  has_value: true
}
```

### 3. Conversion Tracking

**Event**: `conversion_signup_completed`

Fired when a user completes a significant action:

```javascript
{
  conversion_type: "form_submission",
  user_type: "book",
  time_to_convert: 180, // seconds from first form view to completion
  form_name: "harbr_signup",
  referrer: "facebook.com",
  landing_page: "/start"
}
```

### 4. Engagement Tracking

**Event**: `engagement_click`

Captures user interaction with page elements:

```javascript
{
  engagement_type: "click",
  target_element: "cta_button",
  target_type: "button",
  content_type: "hero_section",
  content_id: "home_hero",
  engagement_duration: 0
}
```

**Event**: `cta_clicked`

Specialized tracking for calls-to-action:

```javascript
{
  cta_id: "form_submit_step_1",
  cta_text: "Continue",
  cta_location: "signup_form",
  cta_type: "button",
  cta_position: "bottom",
  page_section: "form",
  form_completion: "33%"
}
```

### 5. Session Quality Metrics

**Event**: `session_quality_scroll_depth`

Measures how far users scroll down pages:

```javascript
{
  metric_type: "scroll_depth",
  metric_value: 75, // 75% of page scrolled
  page_path: "/",
  page_title: "Harbr — Smart marina stays"
}
```

**Event**: `session_quality_time_on_page_final`

Tracks time spent on pages:

```javascript
{
  metric_type: "time_on_page_final",
  metric_value: 120, // seconds
  page_path: "/start",
  page_title: "Harbr — Get Started"
}
```

### 6. Component Visibility

**Event**: `component_viewed`

Tracks when important components are visible in the viewport:

```javascript
{
  component_name: "testimonials_section",
  visibility_percentage: 100,
  time_in_view: 5, // seconds
  page_section: "middle"
}
```

### 7. Error Tracking

**Event**: `error_occurred`

Records application errors with context:

```javascript
{
  error_type: "api_error",
  error_message: "Failed to save form data",
  error_source: "client",
  component: "StartForm",
  recovery_attempted: true,
  recovery_successful: true
}
```

## User Identification

User identification happens after form completion:

```javascript
posthog.identify(email, {
  email: email,
  name: name,
  region: region,
  user_type: interest,
  $set_once: { 
    first_signup_date: "2023-05-15T14:22:35.215Z",
    initial_referrer: "google.com",
    initial_utm_source: "google",
    initial_utm_medium: "cpc",
    initial_utm_campaign: "marina_launch",
    initial_landing_page: "/start"
  }
});
```

## Implementation Details

### Key Growth Metrics Captured

1. **Acquisition Metrics**:
   - Traffic sources (referrer and UTM parameters)
   - Landing page performance
   - Campaign effectiveness

2. **Activation Metrics**:
   - Form start to completion rate
   - Time spent on form steps
   - Field completion rates
   - Validation error frequency

3. **Retention Indicators**:
   - User engagement with content
   - Session duration and depth
   - Feature usage patterns

4. **Performance Metrics**:
   - Error rates and types
   - Page load performance
   - UI interaction delays

## PostHog Dashboard Setup

### Key Dashboards

1. **Marketing Performance**:
   - Traffic source breakdown
   - Campaign conversion rates
   - Landing page effectiveness

2. **Form Conversion Funnel**:
   - Step-by-step conversion rates
   - Drop-off analysis
   - Time spent on each step

3. **User Engagement**:
   - Content popularity
   - Scroll depth averages
   - Time on site metrics

4. **User Segmentation**:
   - By user type/interest
   - By region
   - By referrer

### Key Funnels Configuration

The main conversion funnel is configured as:

1. `form_viewed` (Start)
2. `form_step_changed` with `step_number: 2.0`
3. `form_step_changed` with `step_number: 3.0`
4. `form_completed` (Conversion)

## Implementation Checklist

- [x] Core event tracking (view, click, engagement)
- [x] Form funnel tracking
- [x] Session quality metrics
- [x] User identification
- [x] Error tracking
- [x] Conversion tracking
- [x] UTM and referrer capture

## Growth Analysis Recommendations

1. **Funnel Optimization**:
   - Analyze drop-off points in the form
   - A/B test form field order and copy
   - Test different CTA text and colors

2. **Traffic Quality**:
   - Compare conversion rates by source
   - Identify high-quality traffic channels
   - Optimize marketing spend accordingly

3. **Content Effectiveness**:
   - Analyze which content sections get most engagement
   - Identify content that drives conversions
   - Test different hero messages

4. **User Segmentation Strategies**:
   - Create targeted messaging by user type
   - Develop personalized follow-up based on form data
   - Develop re-engagement campaigns for drop-offs 